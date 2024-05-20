export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            className={`flex items-center ${outline ? "border border-yellow-600 bg-transparent" : "bg-yellow-600"
                } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
            type={type}
        >
            {children ? (
                <>
                    <span className={`${outline && "text-yellow-600"}`}>{text}</span>
                    {children}
                </>
            ) : (text)
            }
        </button>
    )
}