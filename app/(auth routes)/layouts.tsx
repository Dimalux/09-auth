
// app/(auth routes)/layouts.tsx


// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <>{children}</>;
// }



export const metadata = {
  title: 'Authentication - NoteHub',
  description: 'Sign in or create an account to access your notes',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>
    </div>
  );
}