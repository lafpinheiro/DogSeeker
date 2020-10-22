import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Container, Title, FilterSection, ImageSection } from './styles';
import api from '../../services/api';
import ModalAddDogBreed from '../../components/modalAddDogBreed';

interface IDogBreed {
  dogBreedId: string;
  dogBreedName: string;
  image: string;
}

interface ICreateDogBreed {
  dogBreedName: string;
  image: File;
}
const dogShadow: IDogBreed = {
  dogBreedId: '',
  dogBreedName: 'Please choose a Dog Breed',
  image: '/dogshadow.png',
};

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  const [dogBreeds, setDogBreeds] = useState<IDogBreed[]>([]);
  const [selectedDogBreed, setSelectedDogBreed] = useState<IDogBreed>(
    dogShadow,
  );

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    api.get<IDogBreed[]>('/dogbreeds').then((response) => {
      setDogBreeds([dogShadow, ...response.data]);
    });
  }, []);

  const handleDogBreedListChange = useCallback(() => {
    const dogBreed = dogBreeds.filter(
      (dogBreedItem) =>
        dogBreedItem.dogBreedId === selectRef.current?.selectedOptions[0].id,
    )[0];

    setSelectedDogBreed(dogBreed);
  }, [dogBreeds]);

  async function handleAddDogBreed(dogBreed: ICreateDogBreed): Promise<void> {
    // Here is where I am being blocked by CORS, because of the Content-Disposition header...
    // first, save the file on S3
    const fileResponse = await api.post(
      '/SaveNewDogBreed',
      { file: dogBreed.image },
      {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Disposition': 'file; filename="test.jpg"',
        },
      },
    );

    // const fileURL = fileResponse.data.filePath;
    const fileURL = 'file path'; // fileResponse.data.filePath;

    // now, save values on DynamoDb
    const response = await api.post<IDogBreed>('/dogbreeds', {
      dogBreedName: dogBreed.dogBreedName,
      image: fileURL,
    });

    setDogBreeds([
      {
        dogBreedId: response.data.dogBreedId,
        dogBreedName: dogBreed.dogBreedName,
        image: fileURL,
      },
      ...dogBreeds,
    ]);
  }

  return (
    <Container>
      <ModalAddDogBreed
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddDogBreed={handleAddDogBreed}
      />
      <Title>Dog Seeker</Title>
      <FilterSection>
        <button
          type="button"
          onClick={() => {
            toggleModal();
          }}
        >
          <div>
            <FiPlusCircle />
          </div>
        </button>

        <select
          name="dogBreedList"
          onChange={handleDogBreedListChange}
          ref={selectRef}
        >
          {dogBreeds.map((dogBreed) => (
            <option id={dogBreed.dogBreedId} key={dogBreed.dogBreedId}>
              {dogBreed.dogBreedName}
            </option>
          ))}
        </select>
      </FilterSection>
      <ImageSection>
        <img src={selectedDogBreed?.image} alt="" />
      </ImageSection>
    </Container>
  );
};

export default Home;
