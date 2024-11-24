import MinecraftStatus from '../components/MinecraftStatus';
import Script from 'next/script';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MC Status - Minecraft Server Status Checker",
    "description": "Check the status of any Minecraft server instantly. Support for both Java and Bedrock editions.",
    "applicationCategory": "Utility",
    "operatingSystem": "Any",
    "url": "https://mc-status.abhiyanpa.in",
    "author": {
      "@type": "Person",
      "name": "Abhiyan P A",
      "url": "https://abhiyanpa.in"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Check Minecraft Java servers",
      "Check Minecraft Bedrock servers",
      "View server MOTD",
      "Check player count",
      "View server version",
      "Check server ping"
    ]
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MinecraftStatus />
    </>
  );
}