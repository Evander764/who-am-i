type Props = {
  left: string;
  center?: string;
  right: string;
};

export default function PaperBanner({ left, center, right }: Props) {
  return (
    <div className="banner-strip">
      <span>{left}</span>
      <span>{center ?? ""}</span>
      <span>{right}</span>
    </div>
  );
}
