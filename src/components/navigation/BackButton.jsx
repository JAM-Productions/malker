import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="
        absolute
        top-0
        mt-20
        ml-4
        sm:ml-8
        md:ml-12
        lg:ml-18
        xl:ml-24
        2xl:ml-32
    ">
      <IoIosArrowBack
        onClick={goBack}
        className="cursor-pointer text-2xl"
      />
    </div>
  );
};

export default BackButton;
