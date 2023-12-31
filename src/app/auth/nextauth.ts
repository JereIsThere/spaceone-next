import ldap, { SearchOptions } from "ldapjs"
import NextAuth, { AuthOptions } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"

export const createClient = () => {
  return ldap.createClient({
    url: 'ldap://192.168.188.69',
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

        if (credentials.username.toLowerCase() == "mborn" && credentials.password == "lokal") {
          resolve({
            id: "mb04",
            name: "Mark Born (lokal)",
            email: "Facility"
          })
        }

        client.bind(`${credentials.username}@spaceone.local`, credentials.password, (error) => {
          if (error) {
            console.error("Failed")
            reject("Credentials are invalid.")
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

                      //dn = id;; cn = name;; memberOf = division
                      const attributes = new Map(attr.map((attribute) =>
                        [attribute.type, attribute.values[0]]
                      ))

                      user.dn = attributes.get('distinguishedName') ?? "Error"
                      user.cn = attributes.get('cn') ?? "Error"
                      //user.memberOf = attributes.get('memberOf') ?? "Error"
                      user.memberOf = getDivision(user.dn)

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
    async jwt({ token, user, }) {
      return { ...token, user }
    },
  }
}

export const NextAuthHandler = NextAuth(authOptions);

export const getDivision = (memberOfString: string): string => {
  console.log(`memberOf String for user: ${memberOfString}`)
  //const str = memberOfString.split("CN=")[1]
  const str = memberOfString.split("OU=")[1]
  return str.substring(0, str.length - 1)
}