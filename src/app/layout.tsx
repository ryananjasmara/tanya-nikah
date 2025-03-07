import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders, AntdRegistry } from "@/providers";
import { ConfigProvider } from "antd";
import { AuthProvider } from "@/providers/AuthProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tanya Penghulu - Menuntunmu menuju akad yang berkah",
  description:
    "Tanya Penghulu adalah chatbot interaktif yang siap membimbingmu dengan informasi akurat dan terpercaya seputar pernikahan dalam Islam. Dari rukun dan syarat sah nikah hingga tata cara akad yang benar, semua tersedia dalam satu tempat. Dengan TanyaNikah, kamu bisa mendapatkan jawaban yang jelas dan sesuai syariat, kapan saja dan di mana saja. Menuntunmu menuju akad yang berkah!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body>
        <AntdRegistry>
          <ConfigProvider>
            <AuthProvider>
              <AppProviders>{children}</AppProviders>
            </AuthProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
