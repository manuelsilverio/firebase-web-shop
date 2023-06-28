import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <h1>Firebase Shop</h1>
      </div>
      <Link href="/">Home</Link>
      <Link href="/orders/">Orders</Link>
      <Link href="/about">About</Link>
    </nav>
);
}
 
export default Navbar;