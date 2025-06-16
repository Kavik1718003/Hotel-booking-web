import React, { useState } from 'react';
import Title from '../../components/Title'; // Ensure path correctness
import { assets } from '../../assets/assets'; // Ensure path correctness

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: '',
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!inputs.roomType || !inputs.pricePerNight) {
      alert('Please fill in Room Type and Price per Night.');
      return;
    }

    // Prepare amenities list
    const selectedAmenities = Object.entries(inputs.amenities)
      .filter(([_, isChecked]) => isChecked)
      .map(([name]) => name);

    // Prepare image files
    const imageFiles = Object.values(images).filter((file) => file !== null);

    // Final room data
    const roomData = {
      roomType: inputs.roomType,
      pricePerNight: inputs.pricePerNight,
      amenities: selectedAmenities,
      images: imageFiles.map((file) => file.name), // just filenames for example
    };

    console.log('Room Added:', roomData);

    // Here you would POST `roomData` to the backend using fetch or axios.

    setSuccess(true); // show success message
    setTimeout(() => setSuccess(false), 3000); // hide after 3 sec
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title
        align='left'
        font='outfit'
        title='Add Room'
        subTitle='Fill in the details carefully and accurately — room details, pricing, and amenities — to enhance the user booking experience.'
      />

      {/* Upload Area For Images */}
      <p className='text-gray-800 mt-10'>Images</p>

      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className='max-h-32 cursor-pointer opacity-80 border rounded'
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt={`room-${key}`}
            />
            <input
              type='file'
              accept='image/*'
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      {/* Room Type and Price */}
      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-sm'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) =>
              setInputs({
                ...inputs,
                roomType: e.target.value,
              })
            }
            className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'
          >
            <option value=''>Select Room Type</option>
            <option value='Single Bed'>Single Bed</option>
            <option value='Double Bed'>Double Bed</option>
            <option value='Luxury Room'>Luxury Room</option>
            <option value='Family Suite'>Family Suite</option>
          </select>
        </div>

        <div>
          <p className='mt-4 text-gray-800'>
            Price <span className='text-xs'>/night</span>
          </p>
          <input
            type='number'
            placeholder='0'
            className='border border-gray-300 mt-1 rounded p-2 w-24'
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      {/* Amenities */}
      <p className='text-gray-800 mt-4'>Amenities</p>
      <div className='flex flex-col flex-wrap mt-1 text-gray-600 max-w-sm'>
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index} className='flex items-center gap-2 py-1'>
            <input
              type='checkbox'
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`}>{amenity}</label>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='bg-blue-800 text-white px-8 py-2 rounded mt-8 cursor-pointer'
      >
        Add Room
      </button>

      {/* Success Message */}
      {success && (
        <p className='text-green-600 mt-4 font-semibold'>
          ✅ Room added successfully!
        </p>
      )}
    </form>
  );
};

export default AddRoom;
