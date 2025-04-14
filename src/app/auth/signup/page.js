import Link from "next/link";
import Image from "next/image";
import AuthForms from "@/components/AuthForms";

export default function SignUpPage() {
  return (
    <section className="min-h-screen bg-neutral-900 text-white pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 -right-60 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 -left-60 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-200"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-neutral-900 via-neutral-900/50 to-neutral-900"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/vercel.svg"
              alt="Logo"
              width={120}
              height={30}
              className="invert animate-fade-in"
            />
          </Link>
        </div>

        {/* Auth Forms Container */}
        <div className="max-w-md mx-auto">
          <div className="bg-neutral-800/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-neutral-700/50 hover:border-indigo-500/50 transition-all duration-500">
            <AuthForms isLogin={false} />
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-x-4 text-sm text-gray-400 animate-fade-in delay-1000">
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
