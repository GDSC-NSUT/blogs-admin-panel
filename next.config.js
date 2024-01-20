/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
    remotePatterns: [
        {
            protocol: "https",
            hostname: "wrfwbnoxcszcsmoxwhrn.supabase.co",
            port: "",
            pathname: "/**",
        },
        {
            protocol: "http",
            hostname: "localhost",
            port: "*",
            pathname: "/**",
        },
    ],
});

//  images: {
//         domains: ["localhost", "", "wrfwbnoxcszcsmoxwhrn.supabase.co"],
//     },
