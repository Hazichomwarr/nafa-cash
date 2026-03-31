import { Container, Stack, Card, CardContent } from "@/components/ui";
import SendMoneyForm from "../_components/forms/SendMoneyForm";

export default function SendPage() {
  return (
    // <section className="py-12 bg-linear-to-br from-blue-700 to-orange-400 min-h-screen">
    //   <Container>
    //     <Stack gap={6}>
    //       <h1 className="text-3xl font-bold">
    //         Finaliser votre transfert en moins de 5 minutes
    //       </h1>

    //       <Card>
    //         <CardContent>
    //           <SendMoneyForm />
    //         </CardContent>
    //       </Card>
    //     </Stack>
    //   </Container>
    // </section>
    <section className="relative min-screen bg-[url('/images/nafa-bobo.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 py-12">
        <Container>
          <Stack gap={2}>
            <h2 className="text-4xl font-bold text-white">
              Finaliser votre transfert en moins de 5 minutes
            </h2>

            <Card>
              <CardContent>
                <SendMoneyForm />
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </div>
    </section>
  );
}
