import { useOutletContext } from 'react-router-dom';
import SendComplaintForm from '../../../components/main/sendComplaintForm';
import { useEffect } from 'react';

const SendComplaint = () => {
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle('Send Complaint');
  }, [setTitle]);

  return <SendComplaintForm />;
};

export default SendComplaint;
