import { JoinContextProvider } from "./_context/JoinContext";

export default function JoinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JoinContextProvider>{children}</JoinContextProvider>
    </>
  );
}
