import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-8">
      <Link href="/bookings">
        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 focus:outline-none text-lg">
          Bookings
        </button>
      </Link>
    </div>
  );
};

export default Home;
