import { Card, Container } from "@/components/ui";

export default function TrustSection() {
  return (
    <section className="py-10 bg-white">
      <Container>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <Card className="p-4">
            <div className="text-4xl">⚡</div>
            <p className="mt-4 font-bold">Instant Transfers</p>
            <p className="text-sm text-neutral-500">Quick & Reliable</p>
          </Card>

          <Card className="p-4">
            <div className="text-4xl">✅ </div>
            <p className="mt-4 font-semibold">Low Fees</p>
            <p className="text-sm text-neutral-500">Save More on Every Send</p>
          </Card>

          <Card className="p-4">
            <div className="text-4xl">🔒</div>
            <p className="mt-4 font-semibold"> Safe & Trusted</p>
            <p className="text-sm text-neutral-500">Your Security First</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
