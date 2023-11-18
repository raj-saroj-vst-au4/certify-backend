import { PrismaClient } from "@prisma/client";

const handleFetchCert = async (certificateid: number) => {
  const prisma = new PrismaClient();
  const certficate = await prisma.certificate.findUnique({
    where: {
      certId: certificateid,
    },
  });
  if (certficate) {
    return certficate;
  }
  return null;
};

const handleGenerateCertificate = async (
  studentEmail: string,
  studentPhone: number
) => {
  const prisma = new PrismaClient();
  await prisma.student
    .findFirst({
      where: {
        email: studentEmail,
      },
    })
    .then((result) => {
      if (result?.certGen) {
        if (result.phone % 10000 === studentPhone) {
          prisma.certificate
            .findFirst({
              where: {
                studentid: result.id,
              },
            })
            .then((certout) => {
              return certout?.certId;
            });
        } else {
          return null;
        }
      } else {
      }
    });
};

const dbmethods = { handleFetchCert, handleGenerateCertificate };

export default dbmethods;
