import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import ldap from "ldapjs"

const client = ldap.createClient({
  url: 'ldap://192.168.188.69',//process.env.LDAP_URI,
  reconnect: true,
})

const LDAPProvider = () =>
  CredentialsProvider({
    name: "LDAP",
    credentials: {
      username: { label: "DN", type: "text", placeholder: "" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      if (credentials == undefined) {
        throw new Error("Credentials are undefined!")
        // console.log("credentials are undefined")
      }

      // Essentially promisify the LDAPJS client.bind function
      return new Promise((resolve, reject) => {
        
        client.bind(`(&(objectClass=user)(uid=${credentials.username}))`, credentials.password, (error, result) => {
          resolve({
            id: "1",
            email: "@spaceone-fuckyou.de",
            image: "no",
            name: "mark (ficker) born",
          })
          // if (error) {
          //   console.error("Failed", error, result)
          //    reject(error)
          // } else {
          //   console.log("Logged in", result)
          //   resolve({
          //     id: "",
          //     email: "",
          //     image: "",
          //     name: "",
          //   })
          // }
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