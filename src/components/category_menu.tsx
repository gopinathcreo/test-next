"use client";
import Image from "next/image";
import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });
import React, { useState, useEffect, useRef, FC } from "react";
import {
  Category,
  CategoryModel,
  SubCategory,
} from "../providers/models/category";
import { getImageUrl } from "../utils/firebase_utils";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Dialog } from "@material-tailwind/react";
import { usePathname, useSearchParams } from "next/navigation";

type MenuItemProps = {
  children: React.ReactNode;
  subCategories: SubCategory[];
};
type MobileMenuProps = {
  categories: Category[] | undefined;
};

const MenuItem: FC<MenuItemProps> = ({ children, subCategories }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState({});
  const [open, setOpen] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleOpen = () => setOpen(!open);

  const adjustDropdownPosition = () => {
    if (menuRef.current && buttonRef.current) {
      const dropdownRect = menuRef.current.getBoundingClientRect();
      const triggerRect = buttonRef.current.getBoundingClientRect();
      const parentElement = buttonRef.current.closest(".category-dropdown");

      if (parentElement) {
        const parentRect = parentElement.getBoundingClientRect();
        const spaceRight = parentRect.right - triggerRect.right;
        if (spaceRight < dropdownRect.width) {
          let right =
            triggerRect.left + dropdownRect.width > parentRect.right
              ? 0
              : parentRect.right - (triggerRect.left + dropdownRect.width);
          setMenuStyle({
            right: `${right}px`,
            left: "auto",
          });
        } else {
          // Position dropdown menu under the trigger element
          setMenuStyle({
            left: `${triggerRect.left - parentRect.left}px`,
            right: "auto",
          });
        }
      }
    }
  };

  useEffect(() => {
    adjustDropdownPosition();
    window.addEventListener("resize", adjustDropdownPosition);
    return () => {
      window.removeEventListener("resize", adjustDropdownPosition);
    };
  }, []);
  return (
    <li
      className="group w-[150px] md:w-auto lg:w-[150px]"
      onMouseEnter={() => {
        // setIsHovered(true);
        adjustDropdownPosition();
      }}
    >
      <button ref={buttonRef} className="w-full">
        {children}
      </button>
      {subCategories.length && (
        <div
          ref={menuRef}
          style={menuStyle}
          className={`max-w-[800px] hidden justify-between gap-4 flex-wrap max-h-[75vh] overflow-auto absolute bg-white text-black p-4 rounded-[22px] shadow-[0_8px_12px_6px_rgba(0,0,0,0.1490196078)] md:group-hover:flex`}
        >
          {subCategories.map((subCategory) => {
            return (
              <div
                className="md:w-[310px] lg:w-[235px] mt-2 "
                key={subCategory.id}
              >
                <span className="ml-2 font-medium">{subCategory.title}</span>
                <div className="flex flex-wrap justify-start gap-2 mt-3">
                  {subCategory.collections?.length &&
                    subCategory.collections?.map((collection) => {
                      return (

                        <Link
                          href={`/collections/${collection.slug}`}
                          passHref
                          key={collection.slug}
                          className="w-[70.5px] h-[105px] flex flex-col items-center"
                        >
                          <div className="size-[57px] relative bg-[#DEDEE1] rounded-full object-contain  hover:scale-110">

                            <Image
                              className="rounded-full object-cover object-top"
                              src={getImageUrl(collection.image)}
                              alt={collection.title}
                              fill

                            />

                          </div>
                          <span className="item-name text-[24px]">{collection.title}</span>
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </li>
  );
}

const MobileMenu: FC<MobileMenuProps> = ({ categories }) => {
  const [isHome, setIsHome] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsHome(pathname === "/");
    setShowCategory(pathname != "/checkout");
  }, [pathname, searchParams]);
  const [open, setOpen] = React.useState(false);
  const [selectedCat, setSelectedCat] = React.useState(0);
  const openDialog = (index: number) => {
    setOpen(!open);
    setSelectedCat(index);
  };

  return (
    <>

      {categories?.map((category, index) => {
        return (
          <li
            className="group w-[150px] md:w-auto lg:w-[150px]"
            onClick={() => openDialog(index)}
            key={category.id}
          >
            <div className="flex items-center">
              {isHome && (
                <div className="block md:hidden ml-4  relative size-[48px]  bg-[#DEDEE1] rounded-full border-2 border-transparent group-hover:border-[#6A4FA3] flex-none">
                  <Image
                    className="rounded-full"
                    src={getImageUrl(category.image)}
                    alt={category.name}
                    fill
                    objectFit="contain"
                  />
                </div>
              )}
              <span className=" md:w-auto text-sm ml-1 font-medium text-center group-hover:text-[#6A4FA3] shrink">
                {category.name}
              </span>
            </div>
          </li>
        );
      })}
      {categoryDialogMobile()}

    </>
  );

  function categoryDialogMobile() {
    return (

      <Dialog
        open={open}
        size="xxl"
        handler={() => setOpen(!open)}
        className="overflow-y-auto bg-white "
        placeholder=""
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >

        <div className="flex px-4 justify-between items-center text-black h-[65px] ">
          <span>Categories</span>
          <XMarkIcon
            strokeWidth={2.5}
            className="size-6 text-[24px] font-normal"
            onClick={() => setOpen(!open)}
          ></XMarkIcon>
        </div>
        <div className="flex gap-2 ">
          <div className="w-[70px] h-screen-65">
            {categories?.map((category, index) => {
              return (
                <div
                  className="flex flex-col"
                  onClick={() => setSelectedCat(index)}
                  key={category.id}
                >
                  <div
                    className={`flex flex-col relative mb-[2px] justify-center h-[120px] p-2 bg-[#E2E2E5] ${selectedCat == index ? "select" : ""
                      }`}
                  >
                    <div className="bg-[#dedee1] size-[50px] rounded-full relative overflow-hidden">
                      <Image
                        className=""
                        src={selectedCat == index ? getImageUrl(category.selected_image) : getImageUrl(category.image)}
                        alt={category.name}
                        fill
                        objectFit="contain"
                      />
                    </div>
                    <span className="text-center mt-1 leading-[1.2] text-[11px] font-medium text-black">
                      {category.name}
                    </span>
                  </div>
                </div>


              );
            })}
          </div>
          <div className="flex-grow">
            <div className="h-[80px] relative ml-[-9px]">
              <Image
                className=""
                src={getImageUrl(categories?.[selectedCat]?.banner?.image!)}
                alt={"banner"}
                fill
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col px-2 overflow-y-auto text-black h-screen-145">
              {categories?.[selectedCat].sub_categories.map((subCategory) => {
                return (
                  <div key={subCategory.id} className="mt-4">
                    <span className="font-medium">{subCategory.title}</span>
                    <div className="flex flex-wrap gap-4 pb-4 border-b  border-b-[#79747E29]" onClick={() => setOpen(!open)}>
                      {subCategory.collections?.length &&
                        subCategory.collections.map((collection) => {
                          return (
                            <Link
                              href={`/collections/${collection.slug}`}
                              passHref
                              key={collection.slug}
                              className="flex flex-col max-w-[60px]"

                            >
                              <div className="size-[57px] rounded-full bg-[#dedee1] relative mt-2 object-contain ">
                                <Image
                                  className="rounded-full object-cover w-full object-top "
                                  src={getImageUrl(collection.image)}
                                  alt={collection.title}
                                  fill
                                />
                              </div>
                              <span className="!pt-2 overflow-hidden text-center text-[10px] font-medium md:whitespace-normal md:text-base font-bold">
                                {collection.title}
                              </span>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </Dialog>
    );
  }
};

const CategoryMenu: React.FC<CategoryModel> = ({ categories }) => {
  const [isHome, setIsHome] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsHome(pathname === "/");
    setShowCategory(pathname != "/checkout");
  }, [pathname, searchParams]);
  return (
    <>
      {showCategory && (
        <nav className="bg-white justify-center">
          <ul className="items-center justify-between hidden py-2 space-x-2 relative md:flex  category-dropdown lg:space-x-4 pt-3">
            {categories?.map((category) => {
              return (
                <MenuItem
                  key={category.id}
                  subCategories={category.sub_categories}
                >
                  <div className="flex items-center group">
                    {isHome && (
                      <div className="block md:hidden xl:block relative bg-[#DEDEE1] rounded-full border-2 border-transparent group-hover:border-[#6A4FA3] flex-none cursor-auto">
                        <Image
                          className="rounded-full"
                          src={getImageUrl(category.image)}
                          alt={category.name}
                          width={48}
                          height={48}
                          objectFit="contain"
                        />
                      </div>
                    )}
                    <span className=" md:w-auto  text-sm ml-1 font-medium text-center group-hover:text-[#6A4FA3] pl-1 shrink px-2 cursor-auto">
                      {category.name}
                    </span>
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform group-hover:rotate-180 cursor-auto`}
                    />
                  </div>
                </MenuItem>
              );
            })}
          </ul>
          <ul className="flex items-center justify-between gap-4 py-2 overflow-auto md:hidden">
            <MobileMenu categories={categories} />
          </ul>
        </nav>
      )}
    </>
  );
};

export default CategoryMenu;
