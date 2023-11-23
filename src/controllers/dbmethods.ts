import { PrismaClient } from "@prisma/client";
import handleGeneratePdf from "../utils/pdfgen";

const prisma = new PrismaClient();

const handleFetchCertUrl = async (
  certificateid: number
): Promise<string | null> => {
  const certficate = await prisma.certificate.findUnique({
    where: {
      certId: certificateid,
    },
  });
  if (certficate) {
    return certficate.certUrl;
  }
  return null; // Return null if not found
};

const handleGenerateCertificate = async (
  sMail: string,
  sPhoneDigits: string
) => {
  try {
    const result = await prisma.student.findFirst({
      where: {
        email: sMail,
      },
    });

    if (result && parseInt(result.phone) % 10000 === parseInt(sPhoneDigits)) {
      if (result.certGen) {
        const certout = await prisma.certificate.findFirst({
          where: {
            studentid: result.id,
          },
        });
        return certout?.certId ?? "Not Found";
      } else {
        let certExists = true;
        while (certExists) {
          console.log(
            `Generation mail : ${sMail} and phone digits : ${sPhoneDigits} are valid`
          );
          const rancertid = Math.floor(100000 + Math.random() * 900000);
          const foundStat = await handleFetchCertUrl(rancertid);
          if (!foundStat) {
            certExists = false;
            const genpdf_url = await handleGeneratePdf(
              result.name,
              process.env.CERTIFY_DOMAIN ?? "localhost:5001",
              rancertid
            );

            const createdCert = await prisma.certificate
              .create({
                data: {
                  certId: rancertid,
                  certUrl: genpdf_url ?? "err",
                  student: { connect: { id: result.id } },
                },
              })
              .catch((e) => console.log("certificate creation err", e));

            if (createdCert) {
              await prisma.student.update({
                where: { id: result.id },
                data: {
                  certGen: true,
                  certificate: {
                    connect: {
                      id: createdCert.id,
                    },
                  },
                },
              });
              return createdCert.certId;
            }
          }
        }
      }
    } else {
      throw new Error("Invalid digits");
    }
  } catch (err) {
    return null;
  }
};

const handleAddStudent = async (name: string, phone: string, email: string) => {
  const student = await prisma.student.create({
    data: {
      name,
      phone,
      email,
    },
  });
  return student;
};

const handleFetchCertData = async (uinputcertid: number) => {
  try {
    const data = await prisma.certificate.findUnique({
      where: {
        certId: uinputcertid,
      },
      include: {
        student: true,
      },
    });
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

const dbmethods = {
  handleFetchCertUrl,
  handleGenerateCertificate,
  handleAddStudent,
  handleFetchCertData,
};

export default dbmethods;
