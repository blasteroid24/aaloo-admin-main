import React, { useRef } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// import { setCopmanyWalletLedgerLoader } from '@/redux/actions/comanyUserActions';

type Props = {
  setSearchQuery: any
  searchQuery: any;
  id?: any;
  paymentHistory?: boolean
}

const SearchModal = (props: Props) => {
  const op = useRef<OverlayPanel>(null);
  const dispatch = useDispatch()

  const { searchQuery, setSearchQuery, id, paymentHistory } = props

  const handleSearchClick = (e: any) => {
    if (op.current) {
      op.current?.toggle(e);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.currentTarget.value);
      op.current?.hide(); // Hide OverlayPanel
    }
  };

  const handleApplyClick = () => {
    if (paymentHistory && searchQuery.length > 0) {
      // dispatch(setCopmanyWalletLedgerLoader(true))
    }
    const searchInput = document.getElementById('searchName') as HTMLInputElement | null; // Explicitly specify the type
    const searchValue = searchInput?.value ?? ''; // Use optional chaining to access value safely
    setSearchQuery(searchValue);
    op.current?.hide(); // Hide OverlayPanel
  };

  return (
    <div className='relative'>
      <input
        onClick={handleSearchClick}
        placeholder='Search'
        className='border w-full p-2 rounded-[8px]'
        value={searchQuery}
      />
      <OverlayPanel ref={op} className='w-[300px]'>
        <div className='mb-2'>
          <p className='text-[12px] font-medium text-black'>Search name</p>
        </div>
        <input
          id='searchName'
          placeholder='Search'
          className='border w-full p-2 rounded-[8px] text-black text-[12px]'
          onKeyPress={handleKeyPress}
          maxLength={30}
          autoFocus
        />
        <button className='btn h-[44px] btn-dark w-full btn-shadnow-danger mt-3 text-[14px] font-medium py-1' onClick={handleApplyClick}>Apply</button>
      </OverlayPanel>
      <div className='absolute top-2.5 right-2 bg-white'>
        {searchQuery?.length > 0 ?
          <div onClick={() => setSearchQuery('')} className='cursor-pointer bg-white'>
            <IoMdClose size={20} color='#CB333B' />
          </div>
          :
          <IoSearchOutline size={20} />
        }

      </div>

    </div>
  )
}

export default SearchModal