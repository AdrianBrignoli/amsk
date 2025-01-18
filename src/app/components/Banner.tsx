import contentful from '../../../lib/contentful';

export default async function Banner(props: any) {
  let bannerText: string | null = '';

  if (process.env.CONTENTFUL_BANNER_ID !== undefined) {
    try {
      const result = await contentful.getEntry(
        process.env.CONTENTFUL_BANNER_ID
      );
      console.log(bannerText);
      bannerText =
        result.fields.banner !== null ? result.fields.banner.toString() : '';
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full h-8 bg-black">
      <div className="marquee">
        <div className="text-white">{bannerText}</div>
      </div>
    </div>
  );
}
