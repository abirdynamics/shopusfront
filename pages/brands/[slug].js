import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AllProductPage from "../../src/components/AllProductPage/index";
import PageHead from "../../src/components/Helpers/PageHead";
export default function AllProductsPageData(data) {
  const { seoSetting } = data.data;
  const router = useRouter();
  useEffect(() => {
    if (!data.data) {
      router.push("*");
    }
  });
  return (
    <>
      {data && seoSetting && (
        <>
          <PageHead
            title={`${seoSetting.seo_title}`}
            metaDes={seoSetting.seo_description}
          />
          <AllProductPage response={data} />
        </>
      )}
    </>
  );
}
export const getServerSideProps = async (context) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/product?${context.query.brand
        ? `brand=${context.query.brand}`
        : ""
      }`
    );
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        data: false,
      },
    };
  }
};
