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
      console.log("starting auth")

      // You might want to pull this call out so we're not making a new LDAP client on every login attemp
      const client = createClient()

      // Essentially promisify the LDAPJS client.bind function
      return new Promise((resolve, reject) => {
        if(credentials == undefined){
          reject("Credentials null.")
          return
        }

        client.bind(`${credentials.username}@spaceone.local`, credentials.password, (error) => {
          console.log("starting bind...")
          console.log("message: ",error?.message)

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
            client.search(`OU=SpaceOne,DC=spaceone,DC=local`,opts,
              (err, res)=>{
                if(err){
                  console.log("Query error!!!")
                  reject("Error while searching LDAP")
                }else{
                  var entries = []
                  var user = {
                    dn:"",
                    cn:"",
                    division:""
                  }
                  res.on("searchEntry", 
                    (entry)=>{
                      entries.push(entry)
                      const attr = entry.attributes
                      console.log("Attributes: ", JSON.stringify(entry.attributes, null, 3))
                      //console.log(attr)

                      //dn = id;; cn = name;; memberOf = division
                      //TODO left off here
                      user.dn = attr.find((attribute)=>attribute.type.toLowerCase() == "distinguishedName")!!.values[0]
                      user.cn = attr.find((attri)=>attri.type.toLowerCase() == "cn")!!.values[0]
                      user.division = attr.find((attri)=>attri.type.toLowerCase() == "memberof")!!.values[0]

                      console.log("USER: ",   JSON.stringify(user, null, 3))
                  })
                }
              })

            resolve({
              id: credentials.username,
              name: credentials.username,
              email: credentials.password,
              image: ""
            })
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