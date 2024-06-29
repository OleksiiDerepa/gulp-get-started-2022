export let ftpConnect = {
    host: "ftp.example.com", // ftp.example.com - address FTP server
    user: "user", // user name
    password: "password",// user password
    parallel: 10,// count of parallel connections
    maxConnections: 5,// max count of parallel connections
    port: 21, // 21
    dest: "/public_html/", // /public_html/
    secure: false, 
}