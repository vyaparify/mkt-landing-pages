import { BookerEmbed } from "@calcom/atoms";

type BookerProps = {
  username?: string;
  eventSlug?: string;
};

export default function Booker({ username = "rick", eventSlug = "30min" }: BookerProps) {
  return (
    <div className="w-full h-[600px] overflow-hidden rounded-lg bg-background">
      <BookerEmbed
        eventSlug={eventSlug}
        view="MONTH_VIEW"
        username={username}
        customClassNames={{
          bookerContainer: "border-subtle border h-full w-full",
        }}
        onCreateBookingSuccess={() => {
          console.log("booking created successfully");
        }}
      />
    </div>
  );
}
