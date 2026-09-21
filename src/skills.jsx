import { ResponsiveRadar } from '@nivo/radar';

const data = [
  { skill: 'React', value: 75, image: '' },
  { skill: 'Postgress', value: 90, image: '' },
  { skill: 'Mongodb', value: 85, image: '' },
  { skill: 'Next js', value: 70, image: '' },
  { skill: 'python', value: 95, image: '' },
  { skill: 'AWS', value: 75, image: '' },
  { skill: 'JavaScript', value: 85, image: '' },
 
];

const chartTheme = {
  text: {
    fill: 'rgba(248, 250, 252, 0.94)',
    fontSize: 13,
    fontWeight: 700,
  },
  axis: {
    ticks: {
      text: {
        fill: '#f8fafc',
        fontSize: 13,
        fontWeight: 800,
        outlineWidth: 4,
        outlineColor: '#050712',
      },
    },
  },
  grid: {
    line: {
      stroke: 'rgba(148, 163, 184, 0.38)',
      strokeWidth: 1.4,
    },
  },
  dots: {
    text: {
      fill: '#ffffff',
      fontSize: 12,
      fontWeight: 800,
      outlineWidth: 4,
      outlineColor: '#050712',
    },
  },
  crosshair: {
    line: {
      stroke: '#22d3ee',
      strokeWidth: 2,
      strokeOpacity: 0.95,
      strokeDasharray: '5 5',
    },
  },
  tooltip: {
    container: {
      background: 'rgba(5, 7, 18, 0.96)',
      color: '#f8fafc',
      border: '1px solid rgba(34, 211, 238, 0.45)',
      borderRadius: 8,
      boxShadow: '0 18px 40px rgba(0, 0, 0, 0.45)',
      fontSize: 13,
      fontWeight: 700,
    },
  },
};

function getSkillInitials(skill) {
  return skill
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function SkillImage({ image, skill, size = 44 }) {
  return (
    <div
      style={{
        alignItems: 'center',
        background:
          'linear-gradient(145deg, rgba(34, 211, 238, 0.18), rgba(168, 85, 247, 0.16))',
        border: '1px solid rgba(148, 163, 184, 0.26)',
        borderRadius: 14,
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        color: '#dffbff',
        display: 'flex',
        flex: '0 0 auto',
        fontSize: Math.max(12, size * 0.28),
        fontWeight: 900,
        height: size,
        justifyContent: 'center',
        overflow: 'hidden',
        width: size,
      }}
    >
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          style={{
            display: 'block',
            height: '68%',
            objectFit: 'contain',
            width: '68%',
          }}
        />
      ) : (
        getSkillInitials(skill)
      )}
    </div>
  );
}

function SkillTooltip({ index, data: tooltipData }) {
  const value = tooltipData[0]?.formattedValue ?? tooltipData[0]?.value;
  const skill = data.find((item) => item.skill === index) ?? {};

  return (
    <div
      style={{
        minWidth: 190,
        padding: '10px 12px',
      }}
    >
      <div style={{ color: '#94f0ff', fontSize: 12, marginBottom: 4 }}>
        {index}
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
        <SkillImage image={skill.image} skill={skill.skill ?? index} size={42} />
        <div>
          <div style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 700 }}>
            Strength score
          </div>
          <strong style={{ color: '#ffffff', fontSize: 20 }}>{value}%</strong>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      style={{
        background:
          'radial-gradient(900px 520px at 18% 18%, rgba(168, 85, 247, 0.18), rgba(0, 0, 0, 0) 62%), radial-gradient(820px 520px at 82% 24%, rgba(34, 211, 238, 0.12), rgba(0, 0, 0, 0) 60%), linear-gradient(180deg, rgba(5, 7, 18, 0), rgba(7, 12, 26, 0.92) 16%, rgba(7, 12, 26, 0.92) 84%, rgba(5, 7, 18, 0))',
        margin: 0,
        padding: '72px 18px 86px',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth: 1160,
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
          background:
            'linear-gradient(145deg, rgba(15, 23, 42, 0.76), rgba(8, 13, 28, 0.58))',
          border: '1px solid rgba(148, 163, 184, 0.16)',
          borderRadius: 20,
          boxShadow: '0 26px 70px rgba(0, 0, 0, 0.34)',
          overflow: 'hidden',
          padding: '26px clamp(14px, 2vw, 24px) 22px',
          position: 'relative',
        }}
      >
          <div
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(90deg, rgba(34, 211, 238, 0), rgba(34, 211, 238, 0.22), rgba(168, 85, 247, 0.18), rgba(34, 211, 238, 0))',
              height: 1,
              left: 28,
              position: 'absolute',
              right: 28,
              top: 0,
            }}
          />
        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            padding: '0 8px 8px',
          }}
        >
          <div>
            <p
              style={{
                color: '#22d3ee',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.4,
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Skill graph
            </p>
            <h2
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.45rem, 2vw, 2.1rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                margin: '6px 0 0',
              }}
            >
              Professional strengths
            </h2>
          </div>
          <div
            style={{
              background: 'rgba(34, 211, 238, 0.1)',
              border: '1px solid rgba(34, 211, 238, 0.22)',
              borderRadius: 999,
              color: '#dffbff',
              fontSize: 13,
              fontWeight: 800,
              padding: '8px 12px',
              whiteSpace: 'nowrap',
            }}
          >
            Hover skills
          </div>
        </div>

        <div style={{ height: 560, width: '100%' }}>
          <ResponsiveRadar
            data={data}
            keys={['value']}
            indexBy="skill"
            maxValue={100}
            valueFormat=">-.0f"
            margin={{ top: 72, right: 96, bottom: 64, left: 96 }}
            curve="linearClosed"
            borderWidth={3}
            borderColor="#c084fc"
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={40}
            enableDots={true}
            dotSize={13}
            dotColor="#050712"
            dotBorderWidth={3}
            dotBorderColor="#22d3ee"
            enableDotLabel={true}
            dotLabel="value"
            dotLabelYOffset={-16}
            colors={['#a855f7']}
            fillOpacity={0.46}
            blendMode="normal"
            isInteractive={true}
            sliceTooltip={SkillTooltip}
            theme={chartTheme}
            animate={true}
            motionConfig="wobbly"
          role="img"
          ariaLabel="Radar chart showing professional skill strengths"
        />
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(148, 163, 184, 0.16)',
            display: 'grid',
            gap: 10,
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            padding: '18px 8px 4px',
          }}
        >
          {data.map((item) => (
            <div
              key={item.skill}
              style={{
                alignItems: 'center',
                background: 'rgba(15, 23, 42, 0.44)',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                borderRadius: 12,
                display: 'flex',
                gap: 10,
                minWidth: 0,
                padding: '10px',
              }}
            >
              <SkillImage image={item.image} skill={item.skill} />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 800,
                    overflowWrap: 'anywhere',
                  }}
                >
                  {item.skill}
                </div>
                <div
                  style={{
                    color: '#94f0ff',
                    fontSize: 12,
                    fontWeight: 800,
                    marginTop: 2,
                  }}
                >
                  {item.value}%
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
