import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { RingLoader } from 'react-spinners';
import { FaRegFilePdf } from 'react-icons/fa6';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';

const MyOrders = () => {
  const { user } = use(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`https://fureverly-server.vercel.app/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.text('My Orders Report', 14, 15);

    const tableColumn = [
      'SL No',
      'Product Name',
      'Buyer Name',
      'Price',
      'Quantity',
      'Address',
      'Date',
      'Phone',
    ];

    const tableRows = orders.map((order, index) => [
      index + 1,
      order.productName,
      user.displayName,
      order.price,
      order.quantity,
      order.address,
      order.date,
      order.phone,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: 'grid',
      headStyles: { fillColor: [9, 32, 82] },
    });

    doc.save(`MyOrders_${user.displayName}.pdf`);
  };

  return (
    <div className="w-[95%] max-w-6xl mx-auto py-10">
      <title>Fureverly | My Orders</title>

      
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-[#092052] YesevaOne dark:text-white">
          My Orders ({orders.length})
        </h2>

        {orders.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadReport}
            className="bg-[#092052] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0c2a6a] transition-colors"
          >
            <FaRegFilePdf /> Download Report
          </motion.button>
        )}
      </div>

      
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[50vh] flex justify-center items-center"
          >
            <RingLoader size={80} color="#092052" />
          </motion.div>
        )}
      </AnimatePresence>

      
      {!loading && (
        <motion.div
          key="table"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-x-auto"
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#092052] text-white">
              <tr>
                {[
                  'SL No',
                  'Product Name',
                  'Buyer Name',
                  'Price',
                  'Quantity',
                  'Address',
                  'Date',
                  'Phone',
                ].map((head, i) => (
                  <th
                    key={i}
                    className="py-3 px-2 text-center whitespace-nowrap font-semibold"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-black">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t hover:bg-gray-50 transition-all"
                  >
                    <td className="py-3 px-2 text-center">{index + 1}</td>
                    <td className="py-3 px-2 text-center">
                      {order.productName}
                    </td>
                    <td className="py-3 px-2 text-center font-semibold">
                      {user.displayName}
                    </td>
                    <td className="py-3 px-2 text-center">{order.price}</td>
                    <td className="py-3 px-2 text-center">{order.quantity}</td>
                    <td className="py-3 px-2 text-center">{order.address}</td>
                    <td className="py-3 px-2 text-center">{order.date}</td>
                    <td className="py-3 px-2 text-center">{order.phone}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="py-6 text-center text-gray-500 font-medium"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default MyOrders;
