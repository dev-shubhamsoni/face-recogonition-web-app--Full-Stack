interface Signout {
  signOut: () => void;
}

export const Navigation: React.FC<Signout> = ({signOut}) => {

  return (
    <nav className="flex justify-end">
        <p onClick={signOut} className="p-4 text-black text-xl font-semibold cursor-pointer underline">Sign Out</p>
    </nav>
  )
};
