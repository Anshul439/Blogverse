import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <Table hoverable className='shadow-md w-full'>
        <Table.Head>
          <Table.HeadCell className='text-center'>Date created</Table.HeadCell>
          <Table.HeadCell className='text-center'>User image</Table.HeadCell>
          <Table.HeadCell className='text-center'>Username</Table.HeadCell>
          <Table.HeadCell className='text-center'>Email</Table.HeadCell>
          <Table.HeadCell className='text-center'>Admin</Table.HeadCell>
          <Table.HeadCell className='text-center'>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {loading ? (
            <Table.Row>
              <Table.Cell colSpan="6" className="text-center py-4">
                <p className='text-gray-500 dark:text-gray-400'>Loading...</p>
              </Table.Cell>
            </Table.Row>
          ) : users.length > 0 ? (
            users.map((user) => (
              <Table.Row key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='text-center'>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell className='text-center'>
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className='w-10 h-10 object-cover bg-gray-500 rounded-full mx-auto'
                  />
                </Table.Cell>
                <Table.Cell className='text-center'>{user.username}</Table.Cell>
                <Table.Cell className='text-center'>{user.email}</Table.Cell>
                <Table.Cell className='text-center'>
                  {user.isAdmin ? (
                    <FaCheck className='text-green-500 mx-auto' />
                  ) : (
                    <FaTimes className='text-red-500 mx-auto' />
                  )}
                </Table.Cell>
                <Table.Cell className='text-center'>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user._id);
                    }}
                    className='font-medium text-red-500 hover:underline cursor-pointer'
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="6" className="text-center py-4">No users available</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {showMore && !loading && (
        <button
          onClick={handleShowMore}
          className='w-full text-teal-500 self-center text-sm py-7'
        >
          Show more
        </button>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
