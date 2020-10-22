import React, { useCallback } from 'react';
import Modal from '../Modal';
import { Container, Title, FormSection } from './styles';

interface ICreateDogBreed {
  dogBreedName: string;
  image: File;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddDogBreed: (dogBreed: ICreateDogBreed) => void;
}

const ModalAddDogBreed: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddDogBreed,
}) => {
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const formData = new FormData(event.target);
        const data: ICreateDogBreed = {
          dogBreedName: formData.get('dogBreedName') as string,
          image: formData.get('image') as File,
        } as ICreateDogBreed;

        if (data.dogBreedName === '')
          throw new Error('Dog Breed name is required.');

        if (data.image.name === '') throw new Error('Image file is required.');

        handleAddDogBreed(data);
        setIsOpen();
      } catch (error) {
        // TO DO: Display error message on Modal or Toast.
        alert(error.message);
      }
    },
    [handleAddDogBreed, setIsOpen],
  );

  function handleCancel(): void {
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <Container>
          <Title>Add New Dog Breed</Title>
          <FormSection>
            Name:
            <input type="text" id="dogBreedName" name="dogBreedName" />
            Image:
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              // onChange={handleAvatarChange}
            />
            <p>
              {/* eslint-disable-next-line react/button-has-type */}
              <button>Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </p>
          </FormSection>
        </Container>
      </form>
    </Modal>
  );
};

export default ModalAddDogBreed;
