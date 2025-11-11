export default function ApplicationLogo({
    src = "/apple-touch-icon.png",
    alt = "Logo",
    className = "",
    ...props
}) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="eager"
            decoding="async"
            draggable="false"
            {...props}
        />
    );
}
