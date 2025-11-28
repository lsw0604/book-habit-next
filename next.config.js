/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // webpack 설정을 아래와 같이 수정합니다.
  webpack: config => {
    // 1. Next.js의 기본 SVG 로더 규칙을 찾습니다.
    const fileLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test && rule.test.test('.svg')
    );

    // 2. @svgr/webpack을 사용해 SVG를 리액트 컴포넌트로 불러올 수 있도록 새로운 규칙을 추가합니다.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // 3. 기존 SVG 로더 규칙에 exclude 설정을 추가하여,
    //    리액트 컴포넌트로 import하는 SVG는 기존 로더가 처리하지 않도록 합니다. (이 부분이 충돌을 해결합니다)
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

  // images 설정은 그대로 유지됩니다.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search1.kakaocdn.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
