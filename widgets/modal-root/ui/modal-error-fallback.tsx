'use client';

export function ModalErrorFallback({ error }: { error: Error }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h3 className="font-bold text-red-600">모달 오류가 발생했습니다</h3>
        <p className="text-sm text-gray-600 mt-2">잠시 후 다시 시도해주세요.</p>
        <p>{error.message}</p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
          onClick={() => window.location.reload()}
          onKeyDown={e => e.preventDefault()}
        >
          새로고침
        </button>
      </div>
    </div>
  );
}
