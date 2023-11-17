import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import ldap, { SearchOptions } from "ldapjs"
import User from "next-auth"
import { rejects } from "assert"

export const createClient = () => {
  console.log("creating client!")
  return ldap.createClient({
    url: 'ldap://192.168.188.69',//process.env.LDAP_URI,
    //url: '192.168.188.69',
    reconnect: true,
  })
}

const LDAPProvider = () =>
  CredentialsProvider({
    name: "LDAP",
    credentials: {
      username: { label: "DN", type: "text", placeholder: "" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      // You might want to pull this call out so we're not making a new LDAP client on every login attemp
      const client = createClient()

      // Essentially promisify the LDAPJS client.bind function
      return new Promise((resolve, reject) => {
        if (credentials == undefined) {
          reject("Credentials null.")
          return
        }

        client.bind(`${credentials.username}@spaceone.local`, credentials.password, (error) => {
          if (error) {
            console.error("Failed")
            reject()
          } else {
            console.log("Logged in")

            console.log("starting search")
            var opts: SearchOptions = {
              filter: `(sAMAccountName=${credentials?.username})`,
              scope: "sub",
              attributes: [
                "distinguishedName", //id
                "cn", //name
                //"",//email
                "memberOf" //division
              ]
            }
            client.search(`OU=SpaceOne,DC=spaceone,DC=local`, opts,
              (err, res) => {
                if (err) {
                  console.log("Query error!!!")
                  reject("Error while searching LDAP")
                } else {
                  var entries = []
                  var user = {
                    dn: "",
                    cn: "",
                    memberOf: ""
                  }
                  res.on("searchEntry",
                    (entry) => {
                      entries.push(entry)
                      const attr = entry.attributes
                      console.log("Attributes: ", JSON.stringify(entry.attributes, null, 3))

                      //dn = id;; cn = name;; memberOf = division
                      const attributes = new Map(attr.map((attribute) =>
                        [attribute.type, attribute.values[0]]
                      ))

                      user.dn = attributes.get('distinguishedName') ?? "Error"
                      user.cn = attributes.get('cn') ?? "Error"
                      user.memberOf = attributes.get('memberOf') ?? "Error"
                      user.memberOf = getDivision(user.memberOf)
                      
                      console.log("USER: ", JSON.stringify(user, null, 3))
                      resolve({
                        id: user.dn,
                        name: user.cn,
                        email: user.memberOf
                      })
                    })
                }
              })

            // resolve({
            //   id: credentials.username,
            //   name: credentials.username,
            //   email: credentials.password,
            //   image: ""
            // })
          }
        })
      })
    },
  })

export const authOptions: AuthOptions = {
  providers: [
    LDAPProvider(),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, user }
    },
  }
}

export const NextAuthHandler = NextAuth(authOptions);

export const getDivision = (memberOfString: string): string => {
  const str = memberOfString.split("CN=")[1]
  return str.substring(0,str.length-1)
}