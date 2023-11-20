import { PrismaClient } from "@prisma/client";
import handleGeneratePdf from "../utils/pdfgen";

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
  studentPhone: string
) => {
  const prisma = new PrismaClient();
  await prisma.student
    .findFirst({
      where: {
        email: studentEmail,
      },
    })
    .then(async (result) => {
      if (result && parseInt(result.phone) % 10000 === parseInt(studentPhone)) {
        if (result?.certGen) {
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
          let certExists = true;
          while (certExists) {
            let rancertid = Math.floor(100000 + Math.random() * 900000);
            let foundstat = await handleFetchCert(rancertid);
            if (!foundstat) {
              certExists = false;
              handleGeneratePdf(
                result.name,
                process.env.CERTIFY_DOMAIN,
                rancertid,
                result.id
              );
            }
          }
        }
      } else {
        return null;
      }
    });
};

const handleAddStudent = async (name: string, phone: string, email: string) => {
  const prisma = new PrismaClient();
  const student = await prisma.student.create({
    data: {
      name,
      phone,
      email,
    },
  });
  return student;
};

const dbmethods = {
  handleFetchCert,
  handleGenerateCertificate,
  handleAddStudent,
};

export default dbmethods;
