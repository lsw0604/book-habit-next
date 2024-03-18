import ProfileDescription from './_components/profile-description';

export default function ProfilePage() {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="w-full absolute flex flex-col bottom-0 rounded-t-xl h-[90%] gap-4 bg-white">
        {/* TODO: <ProfileHeader /> */}
        <div className="w-full h-full flex flex-col px-4 pt-20 pb-4">
          <ProfileDescription />
          {/* TODO: <ProfileDescription /> */}
          {/* TODO: <ProfileList /> */}
        </div>
      </div>
      <div className="h-full w-full bg-slate-500" />
    </div>
  );
}
