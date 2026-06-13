import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 768) return  // Skip on mobile

    const canvas = canvasRef.current
    if (!canvas) return

    // Scene setup
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)

    // Particles
    const count      = 280
    const positions  = new Float32Array(count * 3)
    const velocities = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.003,
      y:  Math.random() * 0.008 + 0.002,
      z: 0,
    }))

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color:       0xC9A84C,
      size:        0.045,
      transparent: true,
      opacity:     0.55,
      sizeAttenuation: true,
      depthWrite:  false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    function onResize() {
      if (!canvas) return
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }
    window.addEventListener('resize', onResize)

    let raf
    function animate() {
      raf = requestAnimationFrame(animate)
      const pos = geometry.attributes.position

      for (let i = 0; i < count; i++) {
        pos.array[i * 3]     += velocities[i].x
        pos.array[i * 3 + 1] += velocities[i].y

        if (pos.array[i * 3 + 1] > 4)  pos.array[i * 3 + 1] = -4
        if (pos.array[i * 3]     > 6)  pos.array[i * 3]     = -6
        if (pos.array[i * 3]     < -6) pos.array[i * 3]     =  6
      }
      pos.needsUpdate = true

      particles.rotation.y += 0.00015
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" />
}
