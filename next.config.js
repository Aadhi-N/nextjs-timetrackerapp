const withSass = require("@zeit/next-sass");
module.exports = withSass();

module.exports = {
  reactStrictMode: true,
}


// async redirects() {
  //   return [
  //     {
  //       source: "/user/dashboard",
  //       destination: "/login",
  //       permanent: true
  //     }
  //   ]
  // }