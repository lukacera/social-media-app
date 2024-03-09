export const handleScroll = (ref: HTMLElement | null): void => {
    if (ref) {
        window.scrollTo({
            top: ref.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    }
};