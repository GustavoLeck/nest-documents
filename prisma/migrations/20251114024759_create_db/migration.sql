-- CreateTable
CREATE TABLE "documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "employe_id" UUID,
    "document_type" UUID,
    "status" VARCHAR NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL,
    "update_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents_types" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL,
    "update_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "documents_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employe" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "active" BOOLEAN NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL,
    "update_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "employe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_document_type_fkey" FOREIGN KEY ("document_type") REFERENCES "documents_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_employe_id_fkey" FOREIGN KEY ("employe_id") REFERENCES "employe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
