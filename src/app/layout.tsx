import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./typography.css"
import "./form.css"
import "./globals.css"
import MoleculeFooterBar from "@/components/molecules/footer_bar.molecule";
import MoleculeNavigationBar from "@/components/molecules/navigation_bar.molecule";
import { AuthProvider } from "@/providers/auth.provider";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: "EventKu",
  description: "Event booking apps",
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${poppins.className} bg-red-500`}>
        <AuthProvider>
          <MoleculeNavigationBar/>
          {children}
          <MoleculeFooterBar/>
        </AuthProvider>
      </body>
    </html>
  );
}
