import Skeleton from 'react-loading-skeleton'

export default function Loading() {
  return (
    <div className="p-4">
      <h1 className="mb-4">
        <Skeleton width={200} height={30} />
      </h1>
      <div className="grid gap-4">
        {/* Генерация нескольких строк скелетона */}
        <Skeleton count={5} height={20} />
        
        {/* Скелетон для карточки */}
        <div className="flex gap-4 items-center">
          <Skeleton circle width={50} height={50} />
          <div className="flex-1">
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </div>
        </div>
      </div>
    </div>
  )
}
