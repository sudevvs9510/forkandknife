

// import React, { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import authAxios from '../../redux/api/authApi';
// import { useAppSelector, RootState } from '../../redux/app/store';


// interface Transaction {
//   _id: number;
//   amount: number;
//   date: string;
//   type: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface WalletProps {
//   userId: string;
// }

// interface WalletData {
//   _id: string;
//   userId: string;
//   balance: number;
//   transactions: Transaction[];
//   createdAt: string;
//   updatedAt: string;
// }

// const Wallet: React.FC<WalletProps> = ({ userId }) => {
//   const userData = useAppSelector((state: RootState) => state.userAuth.user)
//   console.log(userData)
//   console.log(userId)

//   const [walletData, setWalletData] = useState<WalletData | null>(null);
//   const [amount, setAmount] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);


//   useEffect(() => {
//     const fetchWalletDatas = async () => {
//       try {
//         const response = await authAxios.get(`/wallet-details/${userId}`)
//         console.log(response.data.walletDatas)
//         setWalletData(response.data.walletDatas)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     fetchWalletDatas()
//   }, [userId])

//   const addMoneyToWallet = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY as string);
//       const response = await authAxios.post("/add-money-to-wallet", {
//         userId,
//         amount: parseFloat(amount),
//         userEmail: userData.email,
//         userUsername: userData.username
//       });

//       stripe?.redirectToCheckout({
//         sessionId: response.data.sessionId
//       });
//     } catch (error) {
//       setError("Failed to add money. Please try again.");
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">My Wallet</h1>
//       <div className="mb-6">
//         <div className="text-xl">Balance: <span className='text-teal-600 font-bold'>₹{walletData?.balance ? walletData.balance.toFixed(2) : ' 0.00'}</span></div>
//       </div>
//       <div className="mb-6 flex flex-col items-center mx-auto">
//         <input
//           type="text"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount"
//           className="border p-2 rounded w-full mb-2"
//         />

//         {error && <p className="text-red-500 mt-2">{error}</p>}

//         <button
//           onClick={addMoneyToWallet}
//           className="bg-teal-600 text-white p-2 rounded w-full"
//         >
//           {loading ? 'Processing...' : 'Add Money'}
//         </button>
//       </div>
//       <div>
//         <h2 className="text-xl font-bold mb-4">Transaction History</h2>
//         <ul className=''>
//           {walletData?.transactions.map((transaction) => (
//             <li key={transaction._id} className="mb-2 border rounded p-2">
//               <div className="flex justify-between">
//                 <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
//                   {transaction.type}ed
//                 </span>
//                 <span className='text-teal-600 font-semibold'>₹{transaction.amount.toFixed(2)}</span>
//               </div>
//               <div className="text-sm text-gray-600">{new Date(transaction.createdAt).toLocaleString()}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Wallet;





// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import authAxios from '../../redux/api/authApi';
// import { useAppSelector, RootState } from '../../redux/app/store';
// import toast from 'react-hot-toast';

// interface Transaction {
//   _id: number;
//   amount: number;
//   date: string;
//   type: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface WalletProps {
//   userId: string;
// }

// interface WalletData {
//   _id: string;
//   userId: string;
//   balance: number;
//   transactions: Transaction[];
//   createdAt: string;
//   updatedAt: string;
// }

// const Wallet: React.FC<WalletProps> = ({ userId }) => {
//   const userData = useAppSelector((state: RootState) => state.userAuth.user);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const status = searchParams.get('status');

//   const [walletData, setWalletData] = useState<WalletData | null>(null);
//   const [amount, setAmount] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (status) {
//       if (status === 'success') {
//         toast.success('Payment was successful!');
//       } else if (status === 'failure') {
//         toast.error('Payment failed. Please try again.');
//       }
//     }
//   }, [status]);

//   useEffect(() => {
//     const fetchWalletDatas = async () => {
//       try {
//         const response = await authAxios.get(`/wallet-details/${userId}`);
//         setWalletData(response.data.walletDatas);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchWalletDatas();
//   }, [userId]);

//   const addMoneyToWallet = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY as string);
//       const response = await authAxios.post('/add-money-to-wallet', {
//         userId,
//         amount: parseFloat(amount),
//         userEmail: userData.email,
//         userUsername: userData.username,
//       });

//       stripe?.redirectToCheckout({
//         sessionId: response.data.sessionId,
//       });
//     } catch (error) {
//       setError('Failed to add money. Please try again.');
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">My Wallet</h1>
//       <div className="mb-6">
//         <div className="text-xl">
//           Balance: <span className="text-teal-600 font-bold">₹{walletData?.balance ? walletData.balance.toFixed(2) : '0.00'}</span>
//         </div>
//       </div>
//       <div className="mb-6 flex flex-col items-center mx-auto">
//         <input
//           type="text"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount"
//           className="border p-2 rounded w-full mb-2"
//         />

//         {error && <p className="text-red-500 mt-2">{error}</p>}

//         <button
//           onClick={addMoneyToWallet}
//           className="bg-teal-600 text-white p-2 rounded w-full"
//         >
//           {loading ? 'Processing...' : 'Add Money'}
//         </button>
//       </div>
//       <div>
//         <h2 className="text-xl font-bold mb-4">Transaction History</h2>
//         <ul className="">
//           {walletData?.transactions.slice().reverse().map((transaction) => (
//             <li key={transaction._id} className="mb-2 border rounded p-2">
//               <div className="flex justify-between">
//                 <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
//                   {transaction.type}ed
//                 </span>
//                 <span className="text-teal-600 font-semibold">₹{transaction.amount.toFixed(2)}</span>
//               </div>
//               <div className="text-sm text-gray-600">{new Date(transaction.createdAt).toLocaleString()}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Wallet;




import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import authAxios from '../../redux/api/authApi';
import { useAppSelector, RootState } from '../../redux/app/store';
import toast from 'react-hot-toast';

interface Transaction {
  _id: number;
  amount: number;
  date: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface WalletProps {
  userId: string;
}

interface WalletData {
  _id: string;
  userId: string;
  balance: number;
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

const Wallet: React.FC<WalletProps> = ({ userId }) => {
  const userData = useAppSelector((state: RootState) => state.userAuth.user);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');

  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status) {
      if (status === 'success') {
        toast.success('Payment was successful!');
      } else if (status === 'failure') {
        toast.error('Payment failed. Please try again.');
      }
    }
  }, [status]);

  useEffect(() => {
    const fetchWalletDatas = async () => {
      try {
        const response = await authAxios.get(`/wallet-details/${userId}`);
        setWalletData(response.data.walletDatas);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWalletDatas();
  }, [userId]);

  const addMoneyToWallet = async () => {
    setLoading(true);
    setError(null);
    try {
      const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY as string);
      const response = await authAxios.post('/add-money-to-wallet', {
        userId,
        amount: parseFloat(amount),
        userEmail: userData.email,
        userUsername: userData.username,
      });

      stripe?.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
    } catch (error) {
      setError('Failed to add money. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">My Wallet</h1>
      <div className="mb-6">
        <div className="text-xl">
          Balance: <span className="text-teal-600 font-bold">₹{walletData?.balance ? walletData.balance.toFixed(2) : '0.00'}</span>
        </div>
      </div>
      <div className="mb-6 flex flex-col items-center mx-auto">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 rounded w-full mb-2"
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={addMoneyToWallet}
          className="bg-teal-600 text-white p-2 rounded w-full"
        >
          {loading ? 'Processing...' : 'Add Money'}
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <ul className="">
          {walletData?.transactions.slice().reverse().map((transaction) => (
            <li key={transaction._id} className="mb-2 border rounded p-2">
              <div className="flex justify-between">
                <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                  {transaction.type}ed
                </span>
                <span className="text-teal-600 font-semibold">₹{transaction.amount.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-600">{new Date(transaction.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
