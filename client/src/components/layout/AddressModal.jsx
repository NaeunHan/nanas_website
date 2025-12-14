import DaumPostcode from "react-daum-postcode";
import Modal from "../UI/Modal";

const AddressModal = ({ onClose, setInputAddr, setInputZipCode }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    // console.log(data);
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onClose();
    setInputZipCode(data.zonecode);
    setInputAddr(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <Modal onClose={onClose}>
      <DaumPostcode onComplete={handleComplete} />
    </Modal>
  );
};

export default AddressModal;
