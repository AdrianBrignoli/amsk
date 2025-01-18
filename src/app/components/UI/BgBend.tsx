export default function BgBend() {
  return (
    <div className="absolute w-full h-full -z-10">
      <img
        src="/bend.svg"
        alt="bend"
        width={800}
        height={300}
        className="absolute w-1/2 bottom-24 -left-8 h-96 max-w-96 object-fit"
      />
    </div>
  );
}
