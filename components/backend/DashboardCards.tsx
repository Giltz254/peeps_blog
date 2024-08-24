import { FaUserAlt, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

const DashboardCards = () => {
  return (
    <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="flex items-center justify-between p-4 bg-card shadow rounded-lg w-full">
        <div>
          <h4 className="text-gray-500">Total Order</h4>
          <p className="text-2xl font-semibold">$2198</p>
        </div>
        <div className="text-blue-500 bg-blue-100 p-3 rounded-full">
          <FaUserAlt size={24} />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-card shadow rounded-lg w-full">
        <div>
          <h4 className="text-gray-500">Today's Sales</h4>
          <p className="text-2xl font-semibold">$150</p>
        </div>
        <div className="text-teal-500 bg-teal-100 p-3 rounded-full">
          <FaShoppingCart size={24} />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-card shadow rounded-lg w-full">
        <div>
          <h4 className="text-gray-500">Today's Revenue</h4>
          <p className="text-2xl font-semibold">$1200</p>
        </div>
        <div className="text-blue-500 bg-blue-100 p-3 rounded-full">
          <FaHeart size={24} />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-card shadow rounded-lg w-full">
        <div>
          <h4 className="text-gray-500">Today's Visits</h4>
          <p className="text-2xl font-semibold">7.2k</p>
        </div>
        <div className="text-red-500 bg-red-100 p-3 rounded-full">
          <FaEye size={24} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
