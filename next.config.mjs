/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'bytegrad.com'
            },
            {
                protocol:'https',
                hostname:'images.unsplash.com'
            },
            {
                protocol:'https',
                hostname:'i.ibb.co'
            },
        ]
    }
};

export default nextConfig;
