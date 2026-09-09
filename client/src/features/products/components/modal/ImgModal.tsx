import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useGetOneProduct } from "../../hooks/useGetOneProduct";
const IMG_BASE_URL = `${import.meta.env.VITE_API_STATIC}/api`;

interface ImgInfoProps {
  productId: string | undefined;
  setProductId: (id: string | undefined) => void;
}

export const ImgModal = ({ productId, setProductId }: ImgInfoProps) => {
  const { data: product, isPending } = useGetOneProduct(productId);
  return (
    <AnimatePresence>
      {product?.imageUrl && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-black/90" />

          <div className="relative flex h-full w-full items-center justify-center p-4">
            <div className="relative">
              <button
                className="absolute -right-3 -top-3 z-10 rounded-full bg-black/80 p-2 text-white transition-colors hover:bg-black/60 md:-right-2 md:-top-2"
                onClick={() => setProductId(undefined)}
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              <motion.div
                initial={{
                  opacity: 0,
                  rotateY: -90,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotateY: 90,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                <img
                  className="h-64 w-64 rounded-lg bg-white object-contain p-2 md:h-96 md:w-96 lg:h-full lg:w-full"
                  src={`${IMG_BASE_URL}${product.imageUrl}`}
                  alt={product.name}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
