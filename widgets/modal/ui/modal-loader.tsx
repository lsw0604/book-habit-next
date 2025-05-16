import Loader from '@/shared/common/loader';

export default function ModalLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader size={2} />
    </div>
  );
}
