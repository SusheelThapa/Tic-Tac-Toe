interface Props {
  show: boolean;
  onClose: () => void;
  children: string | React.ReactElement;
  showCloseButton?: boolean;
}

const Modal = ({ show, onClose, children, showCloseButton }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 popup-animation">
      <div className="bg-white p-3 rounded-lg shadow-lg text-center text-black flex flex-col justify-center items-center">
        <div className="w-2/3 text-center text-lg font-semibold my-5 tracking-wider">
          {children}
        </div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 w-full  bg-black text-white rounded-lg"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
