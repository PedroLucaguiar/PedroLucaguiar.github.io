import { ButtonHTMLAttributes } from "react";

interface LogoutButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function LogoutButton({
  children = "Logout",
  className = "",
  ...props
}: LogoutButtonProps) {
  return (
    <button
      className={`
        group
        relative
        flex
        items-center
        justify-start
        w-[45px]
        h-[45px]
        overflow-hidden
        rounded-full
        bg-red-500
        shadow-[2px_2px_10px_rgba(0,0,0,0.2)]
        transition-all
        duration-300
        hover:w-[125px]
        hover:rounded-[40px]
        active:translate-x-[2px]
        active:translate-y-[2px]
        ${className}
      `}
      {...props}
    >
      {/* Ícone */}
      <div
        className="
          flex
          w-full
          items-center
          justify-center
          transition-all
          duration-300
          group-hover:w-[30%]
          group-hover:pl-5
        "
      >
        <svg
          viewBox="0 0 512 512"
          className="w-[17px] h-[17px] fill-white"
        >
          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9v-62.1H192c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96H96c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96C43 480 0 437 0 384V128C0 75 43 32 96 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
        </svg>
      </div>

      {/* Texto */}
      <div
        className="
          absolute
          right-0
          w-0
          overflow-hidden
          whitespace-nowrap
          text-white
          text-[18px]
          font-semibold
          opacity-0
          transition-all
          duration-300
          group-hover:w-[70%]
          group-hover:opacity-100
          group-hover:pr-[10px]
        "
      >
        {children}
      </div>
    </button>
  );
}