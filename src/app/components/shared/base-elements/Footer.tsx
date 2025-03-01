"use client";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-900">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-100">Kontakta oss</h2>
        <p className="text-gray-400">Email: info@amsk.se</p>
        <p className="text-gray-400">Telefon: 08-123 45 67</p>
        <p className="text-gray-400 mt-8">
          © {new Date().getFullYear()} Arlanda Märsta SK. Alla rättigheter
          förbehållna.
        </p>
      </div>
    </footer>
  );
}
