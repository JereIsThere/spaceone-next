import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import ldap, { SearchOptions } from "ldapjs"
import User from "next-auth"

const createClient = ()=>{
  return ldap.createClient({
    url: 'ldap://192.168.188.69',//process.env.LDAP_URI,
    reconnect: true,
  })
}

// let client = createClient()

// const rebindClient = () => {
//   client.destroy();
//   client = createClient()
//   // client.bind(config.ldap.BIND_DN, config.ldap.BIND_CREDENTIALS, (err) => {
//   //     if (err) {
//   //         console.error(err);
//   //     }
//   // });  
// };
// rebindClient();

// client.on('error', (err) => {
//   if (err.errno === -4077) {
//       rebindClient();
//   } else {
//       console.log("Uncaught Error :(")
//       console.error(err);
//   }
// });

const LDAPProvider = () =>
  CredentialsProvider({
    name: "LDAP",
    credentials: {
      username: { label: "DN", type: "text", placeholder: "" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      const client = createClient()

      var user = {}
      var opts: SearchOptions = {
        filter: `(uid=${credentials?.username})`,
        scope: "sub",
        attributes: ["dn", "sn", "cn", "uid"]
      }

      if (credentials == undefined) {
        throw new Error("Credentials are undefined!")
        // console.log("credentials are undefined")
      } 

      // Essentially promisify the LDAPJS client.bind function
      return new Promise((resolve, reject) => {
        console.log("--------------STARTING SEARCH----------")
        client.search(
          `cn=${credentials.username},dc=spaceone,dc=local`,
          opts,
          function(err, res){
            if(err){
              console.log("Error while searching LDAP")
              reject(err)
            }else{
              var entries = []
              res.on("searchEntry", function(entry){
                console.log("ATTRIBUTES: ", JSON.stringify(entry, null, 2))
                entries.push(entry)
                client.bind(
                  entry.dn,
                  credentials.password,
                  (error) =>{
                    if(error){
                      console.error("login failed!!!")
                      reject(error)
                    }else{
                      console.log("Logged in")
                      // user.name = entry.attributes
                      console.log("ATTRIBUTES: ", JSON.stringify(entry, null, 2))

                      resolve({
                        id: entry.dn
                      })
                    }
                  }
                )
              })
            }
          }
        )

        // client.bind(`${credentials.username}@spaceone.local`, credentials.password, (error, result) => {
        //   // resolve({
        //   //   id: "1",
        //   //   email: "@spaceone-fuckyou.de",
        //   //   image: "no",
        //   //   name: "mark (ficker) born",
        //   // })    

        //   console.log("RESULT: ", JSON.stringify(result, null, 2))
        //   console.log("ERROR: ", JSON.stringify(error, null, 2))

        //   if (error) {
        //     console.error("Failed", error, result)
        //      reject(error)
        //   } else {
        //     // console.log("Logged in", result)
        //     resolve({
        //       id: credentials.username,
        //       email: "",
        //       image: "",
        //       name: "",
        //     })
        //   }
        // })
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